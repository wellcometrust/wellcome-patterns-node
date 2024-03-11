output "wc_org_cf_distro_id" {
  value = module.prod_wc_org_cloudfront_distribution.distribution_id
}

output "stage_wc_org_cf_distro_id" {
  value = module.stage_wc_org_cloudfront_distribution.distribution_id
}

output "prod_waf_web_acl_arn" {
  value = module.prod_wc_org_cloudfront_distribution.waf_web_acl_arn
}