import { withInstall } from '@/utils/withInstall';
import radioButton from '@/components/radioButton/radioButton.vue';
import radioButtonGroup from '@/components/radioButton/radioButtonGroup.vue';

const RadioButton = withInstall(radioButton);
const RadioButtonGroup = withInstall(radioButtonGroup);

// export components
export default { RadioButton, RadioButtonGroup };

export { RadioButton, RadioButtonGroup };
