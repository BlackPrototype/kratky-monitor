module.exports = {
  result_fn: '/home/pi/kratky-monitor/public/results.txt',
  app: {
    port: 3000,
    public_dir: 'public'
  },
  serial: {
    path: '/dev/ttyUSB0',
    baudRate: 9600
  }
};
