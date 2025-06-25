import { withInstall } from '@/utils/withInstall';
import customizedModal from '@/components/modal/customizedModal.vue';
import normalModal from '@/components/modal/normalModal.vue';
import fullScreenModal from '@/components/modal/fullScreenModal.vue'

const CustomizedModal = withInstall(customizedModal);
const NormalModal = withInstall(normalModal);
const FullScreenModal = withInstall(fullScreenModal)

// export components
export default { CustomizedModal, NormalModal, FullScreenModal };

export { CustomizedModal, NormalModal, FullScreenModal };
