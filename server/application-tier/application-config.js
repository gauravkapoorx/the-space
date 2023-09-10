"use strict";
/*jslint mocha: true, node: true*/
/***
 * 
 * 
 *   IF YOU ADD A VALUE TO THE CONFIG, MAKE SURE YOU ADD IT TO THE ENVIRONMENTS CONFIG ALSO
 *   /environments/single-server/configs/server/application-config.js
 * 
 * 
 */
/*
*  This config is for properties that are specific to the src-application app.
*  All properties that are applicable to more than one app need to be added to src-frameworks config
*
*/

var applicationConfig = {
    userAccountEmailFromAddress: "#{aws_user_account_from_email}",
    shareFromEmail: "#{aws_share_from_email_address}",
    shareReviewSubject: "#{aws_share_email_subject}",
    defaultShareEmailDisplayName: "PatientBond",
    maxBodySize: "#{aws_max_body_size}",
    rateLimitIntervalMinutes: "#{aws_rate_limit_interval_minutes",
    rateLimitMaxRequestsPerInterval: "#{aws_rate_limit_max}",
    applicationTierHost: "#{aws_application_host}",
    applicationHost: "#{aws_application_host}",
    awsAccessKeyId: "#{aws_route_access_key_id}",
    awsSecretAccessKey: "#{aws_route_secret_access_key}",
    awsRegion: "#{aws_route_region}",
    awsHostedZone: "#{aws_route_hosted_zone}",
    awsDnsName: "#{aws_route_dns_name}",
    awsTargetZone: "#{aws_route_target_zone}",
    tinyUrlV2IpAddress: "#{aws_tiny_url_v2_ip_address}",
    maxBodySize: "500mb",
    rateLimitIntervalMinutes: 15,
    rateLimitMaxRequestsPerInterval: 1000,
    applicationTierHost: "6000",
};
/* Config values for src-application */
module.exports = Object.assign({}, require("../file-tier/file-server-config"),applicationConfig);