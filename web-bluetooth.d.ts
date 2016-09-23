type BluetoothServiceUUID = number | string;
type BluetoothCharacteristicUUID = number | string;
type BluetoothDescriptorUUID  = number | string;

interface BluetoothRequestDeviceFilter {
  services?: BluetoothServiceUUID[];
  name?:string;
  namePrefix?:string;
  manufacturerId?:number;
  serviceDataUUID?: BluetoothServiceUUID;
}

interface RequestDeviceOptions {
  filters: BluetoothRequestDeviceFilter[];
  optionalServices?: number[];
  acceptAllDevices?: boolean;
};

interface BluetoothRemoteGATTDescriptor {
  readonly characteristic: BluetoothRemoteGATTCharacteristic;
  readonly uuid: string;
  readonly value?: DataView;
  readValue(): Promise<DataView>;
  writeValue(value: BufferSource): Promise<void>;
};

interface BluetoothCharacteristicProperties {
  readonly broadcast: boolean;
  readonly read: boolean;
  readonly writeWithoutResponse: boolean;
  readonly write: boolean;
  readonly notify: boolean;
  readonly indicate: boolean;
  readonly authenticatedSignedWrites: boolean;
  readonly reliableWrite: boolean;
  readonly writableAuxiliaries: boolean;
};

interface BluetoothRemoteGATTCharacteristic {
  readonly service?: BluetoothRemoteGATTService;
  readonly uuid: string;
  readonly properties: BluetoothCharacteristicProperties;
  readonly value?:DataView;
  getDescriptor(descriptor: BluetoothDescriptorUUID): Promise<BluetoothRemoteGATTDescriptor>;
  getDescriptors(descriptor?:BluetoothDescriptorUUID):Promise<BluetoothRemoteGATTDescriptor[]>;
  readValue():Promise<DataView>;
  writeValue(value:BufferSource):Promise<void>;
  startNotifications():Promise<BluetoothRemoteGATTCharacteristic>;
  stopNotifications():Promise<BluetoothRemoteGATTCharacteristic>;
};

interface BluetoothRemoteGATTService {
  readonly device: BluetoothDevice;
  readonly uuid: string;
  readonly isPrimary: boolean;
  getCharacteristic( characteristic: BluetoothCharacteristicUUID):  Promise<BluetoothRemoteGATTCharacteristic>;
  getCharacteristics(characteristic?: BluetoothCharacteristicUUID):  Promise<BluetoothRemoteGATTCharacteristic[]>;
  getIncludedService(service: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService>;
  getIncludedServices( service?:BluetoothServiceUUID): Promise<BluetoothRemoteGATTService[]>;
};

interface BluetoothRemoteGATTServer {
  readonly  device: BluetoothDevice;
  readonly connected:  boolean ;
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect();
  getPrimaryService(service: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService>;
  getPrimaryServices(service?: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService[]>;
};

interface BluetoothDevice {
  readonly id: string;
  readonly name?: string;
  readonly gatt?: BluetoothRemoteGATTServer;
  readonly uuids?: string[];

  watchAdvertisements(): Promise<void>;
  unwatchAdvertisements();
  readonly watchingAdvertisements: boolean;
};

interface Bluetooth {
  getAvailability(): Promise<boolean>;
  onavailabilitychanged: Function; // EventHandler
  readonly referringDevice?: BluetoothDevice;
  requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
};

interface Navigator {
  bluetooth : Bluetooth;
}
