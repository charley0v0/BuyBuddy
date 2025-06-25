import { withInstall } from '@/utils/withInstall';
import chip from '@/components/chips/chip.vue';
import chipDescription from '@/components/chips/chipDescription.vue';
import chipRadio from '@/components/chips/chipRadio.vue';

const Chip = withInstall(chip);
const ChipDescription = withInstall(chipDescription);
const ChipRadio = withInstall(chipRadio);

// export components
export default { Chip, ChipDescription, ChipRadio };

export { Chip, ChipDescription, ChipRadio };
