import { withInstall } from '@/utils/withInstall';
import checkbox from '@/components/checkboxs/checkbox.vue';
import checkboxGroup from '@/components/checkboxs/checkboxGroup.vue';

const Checkbox = withInstall(checkbox);
const CheckboxGroup = withInstall(checkboxGroup);

// export components
export default { Checkbox, CheckboxGroup };

export { Checkbox, CheckboxGroup };
