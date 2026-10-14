// US-01-04#5 — all automatic content checks pass, the 5+ deck among them, and breaking any one of
// them in the 5+ deck fails the suite.
import { describeContentChecks } from './deck-criteria';

describeContentChecks('AC-01-04-5', '5+');
