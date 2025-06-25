import { withInstall } from '@/utils/withInstall';
import defaultInput from '@/components/inputs/defaultInput.vue';
import inputNumber from '@/components/inputs/inputNumber.vue';
import inputNumberNoBtn from '@/components/inputs/inputNumberNoBtn.vue';

const DefaultInput = withInstall(defaultInput);
const InputNumber = withInstall(inputNumber);
const InputNumberNoBtn = withInstall(inputNumberNoBtn);

// export components
export default { DefaultInput, InputNumber, InputNumberNoBtn };

export { DefaultInput, InputNumber, InputNumberNoBtn };
