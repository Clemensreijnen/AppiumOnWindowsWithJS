"use strict";
require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers'),
    Q = require('q');

describe("Windows test from Node", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = _.clone(require("./helpers/caps").Calculator);
    desired.app = require("./helpers/apps").myTestCalculatorApp;
    
    return driver
    .init(desired);

  });

  after(function () {
    return driver
      .quit();
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });


  it("should open calculator and sum three ones.", function () {
    return driver
    .elementByName('One').click()
    .elementByName('Plus').click()
    .elementByName('One').click()
    .elementByName('Plus').click()
    .elementByName('One').click()
    .elementByName('Equals').click()
    .elementByName('Display is 3')
    .text().should.eventually.include('Display is 3');
  });

});