import { withInstall } from '@/utils/withInstall';
import select from '@/components/select/select.vue';
import groupSelect from '@/components/select/groupSelect.vue';

const Select = withInstall(select);
const GroupSelect = withInstall(groupSelect);

// export components
export default { Select, GroupSelect };

export { Select, GroupSelect };
