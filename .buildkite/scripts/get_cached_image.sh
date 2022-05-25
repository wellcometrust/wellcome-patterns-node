#!/usr/bin/env bash
# We have some Docker images (e.g. playwright, pa11y) that are quite large
# and take a while to build (~2m), but don't change that much -- they're
# self-contained and only need to change when we add new tests.
#
# To save us building it every time we use it, this script caches built
# images in an ECR repo.
#
# In particular, it pushes new Docker images with two tags:
#
#   - latest
#   - the Git commit ref
#
# so downstream builds can just pull "weco/$name:latest", and this
# script makes sure that tag always reflects the latest copy of these tests.

set -o errexit
set -o nounset

IMAGE_NAME="$1"
FOLDER_NAME="$2"

ROOT=$(git rev-parse --show-toplevel)

ECR_REPO_PREFIX="130871440101.dkr.ecr.eu-west-1.amazonaws.com"

# Get the last commit that modified the relevant folder
LAST_PA11Y_COMMIT=$(git log -n 1 --pretty=format:%H -- "$ROOT/$FOLDER_NAME")

# Log in to ECR
eval $(aws ecr get-login --no-include-email),

# This looks in the "weco/$IMAGE_NAME" repo for an image tagged "latest",
# and then it looks for an image tag "ref.abc…" and extracts the commit.
#
# This is the commit of the latest Playwright image.
#
# See the jq() manual for a detailed explanation of the syntax:
# https://stedolan.github.io/jq/manual/#Basicfilters
#
# We get a JSON object from the 'describe-images' command like:
#
#     {
#       "imageDetails": [
#         {
#           ...
#           "imageTags": [
#             "latest",
#             "7dbca1eff7dc6444a25593ccd37f5f26f335d9dd",
#           ],
#         }
#       ]
#     }
#
# and we want to get that Git commit ID without

LATEST_ECR_COMMIT=$(
  aws ecr describe-images \
    --repository-name="weco/$IMAGE_NAME" \
    --image-ids='imageTag=latest' |
  jq -r '
    .imageDetails[0]
      | .imageTags
      | map(select(. | contains("latest") | not))
      | .[0]'
)

if [[ "$LATEST_ECR_COMMIT" == "$LAST_LOCAL_COMMIT" ]]
then
  echo "Latest image in ECR reflects what's in Git, nothing to do ($LAST_LOCAL_COMMIT)"
  exit 0
else
  echo "Latest image in ECR ($LATEST_ECR_COMMIT) isn't what's in Git ($LAST_LOCAL_COMMIT), so pushing a new image"
  set -o verbose
  docker build --tag "weco/$IMAGE_NAME:$LAST_LOCAL_COMMIT" --file "$ROOT/$FOLDER_NAME/Dockerfile" .

  docker tag "weco/playwright:$LAST_LOCAL_COMMIT" "$ECR_REPO_PREFIX/weco/playwright:$LAST_LOCAL_COMMIT"
  docker push "$ECR_REPO_PREFIX/weco/$IMAGE_NAME:$LAST_LOCAL_COMMIT"

  docker tag "weco/playwright:$LAST_LOCAL_COMMIT" "$ECR_REPO_PREFIX/weco/playwright:latest"
  docker push "$ECR_REPO_PREFIX/weco/$IMAGE_NAME:latest"
fi
