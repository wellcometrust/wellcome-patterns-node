module "events_exhibitions_cluster_asg" {
  source                = "git::https://github.com/wellcometrust/terraform.git//ecs_asg?ref=v1.0.4"
  asg_name              = "event-exhibitions-cluster"
  subnet_list           = "${local.vpc_subnets}"
  key_name              = "${var.key_name}"
  instance_profile_name = "${module.ecs_events_exhibitions_iam.instance_profile_name}"
  user_data             = "${module.events_exhibitions_userdata.rendered}"
  vpc_id                = "${local.vpc_id}"

  asg_desired = "2"
  asg_max     = "2"

  image_id      = "${data.aws_ami.stable_coreos.image_id}"
  instance_type = "t2.micro"

  sns_topic_arn         = "${module.ec2_terminating_topic.arn}"
  publish_to_sns_policy = "${module.ec2_terminating_topic.publish_policy}"

  alarm_topic_arn = "${module.ec2_instance_terminating_for_too_long_alarm.arn}"
}
