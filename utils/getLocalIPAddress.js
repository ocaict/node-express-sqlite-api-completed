import { networkInterfaces } from "os";

const getLocalIPAddress = () => {
  // Logic to get local IP address

  const interfaces = networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
};

export default getLocalIPAddress;
