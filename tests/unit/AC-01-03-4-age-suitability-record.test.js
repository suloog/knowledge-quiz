// US-01-03#4 — the age-suitability check of every 4+ question is recorded (Q29, DEC-46): the
// record, copied into the pull request, has a row passing all four checks for each question and
// naming the near misses checked for its one answer; no 4+ question offers answer options (DEC-47).
const { describeAgeSuitabilityRecord } = require('./age-suitability-record');

describeAgeSuitabilityRecord({
  ac: 'AC-01-03-4',
  category: '4+',
  record: 'docs/delivery/content-checks/US-01-03-4-plus.md',
  idPrefix: '4p-',
});
