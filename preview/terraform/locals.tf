locals {
  prod_alb_dns         = data.terraform_remote_state.experience.outputs.prod["alb_dns_name"]
  prod_cf_origin_id    = data.terraform_remote_state.cache.outputs.wc_org_cf_distro_id
  prod_waf_web_acl_arn = data.terraform_remote_state.cache.outputs.prod_waf_web_acl_arn

  wellcome_cdn_cert_arn = "arn:aws:acm:us-east-1:130871440101:certificate/bb840c52-56bb-4bf8-86f8-59e7deaf9c98"

  // Use the current shared secret from the cache state
  current_shared_secret = data.terraform_remote_state.cache.outputs.current_shared_secret
}
