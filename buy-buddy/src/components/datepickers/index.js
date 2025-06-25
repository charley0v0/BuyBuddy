import { withInstall } from '@/utils/withInstall';
import datepicker from '@/components/datepickers/datepicker.vue';
import datepickerRange from '@/components/datepickers/datepickerRange.vue';

const Datepicker = withInstall(datepicker);
const DatepickerRange = withInstall(datepickerRange);

// export components
export default { Datepicker, DatepickerRange };

export { Datepicker, DatepickerRange };
