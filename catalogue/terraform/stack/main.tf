module "catalogue-service-17092020" {
  source = "../../../infrastructure/modules/service"

  namespace = "catalogue-17092020-${var.env_suffix}"

  namespace_id = var.environment["namespace_id"]
  cluster_arn  = var.environment["cluster_arn"]

  healthcheck_path = "/management/healthcheck"

  container_image = var.container_image
  container_port  = 3000

  security_group_ids = [
    var.environment["interservice_security_group_id"],
    var.environment["service_egress_security_group_id"]
  ]

  # Note: in September 2022, we were running with 0.5 vCPU and 1 GB of memory;
  # we saw occasionally failures where the memory would spike to 100%
  # and the app would crash.
  #
  # We're increasing it to 2 GB to see if that improves reliability.
  #
  # Note 2: in November 2022, we were running with 0.5 vCPUs and 2gb of memory;
  # we saw latency spikes and CPUUtilization maxima often in the 80-100% region.
  # These would occasionally result in 502s and so on.
  #
  # We're increasing vCPU to 1 in prod to see if this is addressed.
  #
  # Note 3: in September 2023, we were running with 1 vCPU and 2 GB of memory.
  # The app's latency was exploding, possibly caused by a memory leak of
  # as-yet undetermined cause.
  cpu    = var.env_suffix == "prod" ? 2048 : 512
  memory = var.env_suffix == "prod" ? 4096 : 1024

  env_vars = {
    PROD_SUBDOMAIN  = var.subdomain
    APM_ENVIRONMENT = var.env_suffix
  }

  secret_env_vars = {
    APM_SERVER_URL      = "elasticsearch/logging/apm_server_url"
    APM_SECRET          = "elasticsearch/logging/apm_secret"
    items_api_key_prod  = "catalogue_api/items/prod/api_key"
    items_api_key_stage = "catalogue_api/items/stage/api_key"

    PRISMIC_ACCESS_TOKEN = "prismic-model/prod/access-token"
    PRISMIC_BEARER_TOKEN = "prismic-model/graphql/prismic_bearer_token"
  }

  vpc_id  = local.vpc_id
  subnets = local.private_subnets

  allow_scaling_to_zero = var.env_suffix != "prod"

  use_fargate_spot              = var.use_fargate_spot
  turn_off_outside_office_hours = var.turn_off_outside_office_hours
}
