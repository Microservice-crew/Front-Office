// eureka.js
const Eureka = require("eureka-js-client").Eureka;

const eureka = new Eureka({
  instance: {
    app: "serviceregistry",
    hostName: "localhost", // Change this to your Node.js service's actual host
    ipAddr: "127.0.0.1", // Change this to your Node.js service's actual IP
    port: {
      $: 9000,
      "@enabled": true,
    },
    vipAddress: "serviceregistry",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "localhost",
    port: 8761,
    servicePath: "/eureka/apps/",
  },
});

eureka.start();
