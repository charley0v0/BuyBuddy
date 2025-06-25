import { withInstall } from '@/utils/withInstall';
import testAlert from '@/components/testAlert/testAlert.vue';

const TestAlert = withInstall(testAlert);

// export components
export default { TestAlert };

export { TestAlert };