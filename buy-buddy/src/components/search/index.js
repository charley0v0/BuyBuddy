import { withInstall } from '@/utils/withInstall';
import searchType from '@/components/search/searchType.vue';
import searchBar from '@/components/search/searchBar.vue';
import searchDate from '@/components/search/searchDate.vue';
import searchDateBar from '@/components/search/searchDateBar.vue';

const SearchType = withInstall(searchType);
const SearchBar = withInstall(searchBar);
const SearchDate = withInstall(searchDate);
const SearchDateBar = withInstall(searchDateBar);

// export components
export default { SearchType, SearchBar, SearchDate, SearchDateBar };

export { SearchType, SearchBar, SearchDate, SearchDateBar };
