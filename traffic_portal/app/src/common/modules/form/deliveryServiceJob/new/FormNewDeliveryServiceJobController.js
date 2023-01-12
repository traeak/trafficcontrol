/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @param {*} deliveryService
 * @param {*} job
 * @param {*} $scope
 * @param {import("angular").IControllerService} $controller
 * @param {import("../../../../api/JobService")} jobService
 * @param {import("../../../../models/MessageModel")} messageModel
 * @param {import("../../../../service/utils/LocationUtils")} locationUtils
 */
var FormNewDeliveryServiceJobController = function(deliveryService, job, $scope, $controller, jobService, messageModel, locationUtils) {

	// extends the FormDeliveryServiceJobController to inherit common methods
	angular.extend(this, $controller('FormDeliveryServiceJobController', { deliveryService: deliveryService, job: job, $scope: $scope }));

	// define invalidation types
	$scope.invalidationtypes = [
		'REFRESH',
		'REFETCH'
	];
	// set default invalidation type
	$scope.job.invalidationType = $scope.invalidationtypes[0];

	$scope.jobName = 'New';

	$scope.settings = {
		isNew: true,
		saveLabel: 'Create'
	};

	$scope.save = function(job) {
		job.startTime = (new Date((new Date()).getTime() + 5*60*1000)).toISOString();
		job.deliveryService = deliveryService.xmlId;
		jobService.createJob(job)
			.then(
				function(result) {
					if(result.data !== undefined && result.data.alerts !== undefined){
						messageModel.setMessages(result.data.alerts, true);
					}
					locationUtils.navigateToPath('/delivery-services/' + deliveryService.id + '/jobs');
				},
				function(fault) {
					messageModel.setMessages(fault.data.alerts, false);
				}
			);
	};

};

FormNewDeliveryServiceJobController.$inject = ['deliveryService', 'job', '$scope', '$controller', 'jobService', 'messageModel', 'locationUtils'];
module.exports = FormNewDeliveryServiceJobController;
