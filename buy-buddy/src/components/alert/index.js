import { withInstall } from '@/utils/withInstall';
import descriptionAlert from '@/components/alert/descriptionAlert.vue';
import noDescriptionAlert from '@/components/alert/noDescriptionAlert.vue';
import deviceAlert from '@/components/alert/deviceAlert.vue';
import notification from '@/components/alert/notification.vue';

const DescriptionAlert = withInstall(descriptionAlert);
const NoDescriptionAlert = withInstall(noDescriptionAlert);
const DeviceAlert = withInstall(deviceAlert);
const Notification = withInstall(notification);

// export components
export default { DescriptionAlert, NoDescriptionAlert, DeviceAlert, Notification };

export { DescriptionAlert, NoDescriptionAlert, DeviceAlert, Notification };
