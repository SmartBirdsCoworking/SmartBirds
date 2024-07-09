### ALB
resource "aws_security_group" "alb" {
  name = "${var.name}-alb-sg"
  vpc_id = module.network.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

    tags = {
        Name = "${var.name}-alb-sg"
    }
}

resource "aws_security_group_rule" "alb_ingress" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_lb" "alb" {
  name               = "${var.name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = module.network.public_subnets
}

resource "aws_lb_target_group" "api_target_group" {
  name     = "${var.name}-api-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = module.network.vpc_id
  target_type = "ip"
}

resource "aws_lb_listener" "alb_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.miniapp_target_group.arn
#   }
  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "404: Not Found"
      status_code  = "404"
    }
  }
}

resource "aws_lb_target_group" "miniapp_target_group" {
  name     = "${var.name}-miniapp-tg"
  port     = 3001
  protocol = "HTTP"
  vpc_id   = module.network.vpc_id
  target_type = "ip"
}

