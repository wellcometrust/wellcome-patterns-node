module "alb_server_error_alarm" {
  source = "git::https://github.com/wellcometrust/terraform.git//sns?ref=v1.0.4"
  name   = "alb_server_error_alarm"
}

module "alb_client_error_alarm" {
  source = "git::https://github.com/wellcometrust/terraform.git//sns?ref=v1.0.4"
  name   = "alb_client_error_alarm"
}
