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
 *
 * @param {*} cdn
 * @param {*} $scope
 * @param {import("angular").IControllerService} $controller
 * @param {import("../../../../service/utils/angular.ui.bootstrap").IModalService} $uibModal
 * @param {import("angular").IAnchorScrollService} $anchorScroll
 * @param {import("../../../../service/utils/LocationUtils")} locationUtils
 * @param {import("../../../../api/CDNService")} cdnService
 * @param {import("../../../../models/MessageModel")} messageModel
 */
var FormEditCDNController = function(cdn, $scope, $controller, $uibModal, $anchorScroll, locationUtils, cdnService, messageModel) {

    // extends the FormCDNController to inherit common methods
    angular.extend(this, $controller('FormCDNController', { cdn: cdn, $scope: $scope }));

    var deleteCDN = function(cdn) {
        cdnService.deleteCDN(cdn.id)
            .then(function(result) {
                messageModel.setMessages(result.alerts, true);
                locationUtils.navigateToPath('/cdns');
            });
    };

    $scope.cdnName = angular.copy(cdn.name);

    $scope.settings = {
        isNew: false,
        saveLabel: 'Update'
    };

    $scope.save = function(cdn) {
        cdnService.updateCDN(cdn).
            then(function() {
                $scope.cdnName = angular.copy(cdn.name);
                $anchorScroll(); // scrolls window to top
            });
    };

    $scope.confirmDelete = function(cdn) {
        var params = {
            title: 'Delete CDN: ' + cdn.name,
            key: cdn.name
        };
        var modalInstance = $uibModal.open({
            templateUrl: 'common/modules/dialog/delete/dialog.delete.tpl.html',
            controller: 'DialogDeleteController',
            size: 'md',
            resolve: {
                params: function () {
                    return params;
                }
            }
        });
        modalInstance.result.then(function() {
            deleteCDN(cdn);
        }, function () {
            // do nothing
        });
    };

};

FormEditCDNController.$inject = ['cdn', '$scope', '$controller', '$uibModal', '$anchorScroll', 'locationUtils', 'cdnService', 'messageModel'];
module.exports = FormEditCDNController;
