output "domain_name" {
  value = aws_cloudfront_distribution.wc_org.domain_name
}

output "distribution_id" {
  value = aws_cloudfront_distribution.wc_org.id
}

output "waf_web_acl_arn" {
  value = aws_wafv2_web_acl.wc_org.arn
}