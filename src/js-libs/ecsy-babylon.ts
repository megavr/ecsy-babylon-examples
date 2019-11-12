import * as EB from "@megavr/ecsy-babylon/packages/index";

declare global { interface Window { EB: any; } }
window.EB = EB;