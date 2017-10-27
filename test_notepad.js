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

    var desired = _.clone(require("./helpers/caps").notepad);
        
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


  it("should open Notepad", function () {
    return driver
    .title().should.become('Untitled - Notepad');
  });

    
  it("Test Scenario MenuItem", function () {
    return driver
    .elementByName("Edit").click()
    .elementByXPath("//MenuItem[starts-with(@Name, \"Time/Date\")]").click()
    .elementByName("Edit").click()
    .elementByXPath("//MenuItem[starts-with(@Name, \"Select All\")]").click()
    .elementByName("Edit").click()
    .elementByXPath("//MenuItem[starts-with(@Name, \"Copy\")]").click()
    .elementByName("Edit").click()
    .elementByXPath("//MenuItem[starts-with(@Name, \"Paste\")]").click()
    .elementByName("Edit").click()
    .elementByXPath("//MenuItem[starts-with(@Name, \"Paste\")]").click()
    .elementByName("Text Editor").text()
    .should.eventually.have.length.above(10);
  });


  it("Scenario Editor Enter Text", function () {
    return driver
    .elementByName("Edit").click()
    .elementByXPath("//MenuItem[starts-with(@Name, \"Select All\")]").click()
    .elementByName("Edit").click()
    .elementByXPath("//MenuItem[starts-with(@Name, \"Del\")]").click()
    .sleep(3000)
    .elementByName("Text Editor")
    .sendKeys('Hello from Appium with JS')
    .elementByName("Text Editor").text()
    .should.become('Hello from Appium with JS');
  });


  it("Scenario Popup Dialog SaveFile", function () {
    return driver
    .elementByName("File").click() //
    .elementByName("Save As...").click() 
    .sleep(3000)
    .elementByAccessibilityId("FileNameControlHost")
    .sendKeys('test.txt')
    .elementByName("Save").click()
    .sleep(3000)
    .title().should.become('test.txt - Notepad');
  });
});