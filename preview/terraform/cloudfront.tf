# This is a cache that gives us a shield against our origin ALB:
# - Allows us to use a custom header to authenticate requests to the backend.
# - Uses the prod WAF web ACL to protect the distribution.

resource "aws_cloudfront_distribution" "preview" {
  web_acl_id = local.prod_waf_web_acl_arn

  origin {
    domain_name = local.prod_alb_dns
    origin_id   = local.prod_cf_origin_id

    custom_origin_config {
      origin_protocol_policy = "https-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    # We need to send the backend token to the load balancer so that it can
    # authenticate requests to the backend.
    custom_header {
      name  = "x-weco-cloudfront-shared-secret"
      value = local.current_shared_secret
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  aliases = ["preview.wellcomecollection.org"]

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET"]
    cached_methods         = ["HEAD", "GET"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = local.prod_cf_origin_id
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true

    forwarded_values {
      query_string = true
      headers      = ["*"]

      cookies {
        forward = "all"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn      = local.wellcome_cdn_cert_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  retain_on_delete = true
}

