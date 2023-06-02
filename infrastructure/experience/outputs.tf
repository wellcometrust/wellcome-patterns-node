output "content_webapp_ecr_uri" {
  value = aws_ecr_repository.content_webapp.repository_url
}

output "catalogue_webapp_ecr_uri" {
  value = aws_ecr_repository.catalogue_webapp.repository_url
}

output "identity_webapp_ecr_uri" {
  value = aws_ecr_repository.identity_webapp.repository_url
}

output "prod" {
  value = module.prod
}

output "stage" {
  value = module.stage
}
