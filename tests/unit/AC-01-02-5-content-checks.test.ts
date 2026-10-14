// US-01-02#5 — all automatic content checks pass, and breaking any one of them fails the suite.
import { describeContentChecks } from './deck-criteria';

describeContentChecks('AC-01-02-5', '3+');
