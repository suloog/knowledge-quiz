// US-01-03#5 — all automatic content checks pass, the 4+ deck among them, and breaking any one of
// them in the 4+ deck fails the suite.
import { describeContentChecks } from './deck-criteria';

describeContentChecks('AC-01-03-5', '4+');
