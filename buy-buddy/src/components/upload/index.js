import { withInstall } from '@/utils/withInstall';
import fileUploadSingle from '@/components/upload/fileUploadSingle.vue';
import photoUploadMulti from '@/components/upload/photoUploadMulti.vue';
import photoUploadSingleDrag from '@/components/upload/photoUploadSingleDrag.vue';

const FileUploadSingle = withInstall(fileUploadSingle);
const PhotoUploadMulti = withInstall(photoUploadMulti);
const PhotoUploadSingleDrag = withInstall(photoUploadSingleDrag);

// export components
export default { FileUploadSingle, PhotoUploadMulti, PhotoUploadSingleDrag };

export { FileUploadSingle, PhotoUploadMulti, PhotoUploadSingleDrag };
