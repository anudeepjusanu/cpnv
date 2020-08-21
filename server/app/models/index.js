const ModuleRevision = require("./moduleRevision");
const SoftwareVersion = require("./softwareVersion");
const Instrument = require("./instrument");
const DVR = require("./dvr");
const Address = require("./address");
const FetchInstrument = require("./fetchInstrument");
const FetchModule = require("./fetchModule");

module.exports = {
  ModuleRevision: ModuleRevision,
  SoftwareVersion: SoftwareVersion,
  Instrument: Instrument,
  DVR: DVR,
  Address: Address,
  FetchInstrument: FetchInstrument,
  FetchModule: FetchModule,
};
