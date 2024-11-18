import { FIRST_INDEX, ITEMS_PER_PAGE, ROUTERS } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { getAllLeads } from '@/queries/portalLeads';
import { updateLeadsAdmin } from '@/redux/slides/leadsAdminSlice';
import { RootState } from '@/redux/store';
import { IPortalLead } from '@/utils/types';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAdminHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IPortalLead[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const router = useRouter();
  const leadsData = useSelector((state: RootState) => state.leadsAdminReducer.data);
  const { profile, isAdmin } = useAuthState();

  //pagination
  const [itemOffset, setItemOffset] = useState<number>(FIRST_INDEX);
  const [currentPage, setCurrentPage] = useState<number>(FIRST_INDEX);
  const [totalItems, setTotalItems] = useState<number>(FIRST_INDEX);
  const pageCount = useMemo(() => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  }, [totalItems]);

  const onChangeTextSearch = useCallback((value: string) => {
    if (!value) {
      setLoading(true);
      setTimeout(() => {
        const dataSlice = [...leadsData].slice(FIRST_INDEX, FIRST_INDEX + ITEMS_PER_PAGE);
        setTableData(dataSlice);
        setTotalItems(leadsData.length);
        setItemOffset(FIRST_INDEX);
        setCurrentPage(FIRST_INDEX)
        setLoading(false);
      }, 500);
    }
    setSearchText(value);
  }, []);

  const handleSearchLeads = useCallback(() => {
    setLoading(true);
    const lowerCasedSearch = searchText.toLowerCase().trim();
    const searchedValues = leadsData.filter(item =>
      item.firstName.trim().toLowerCase().includes(lowerCasedSearch) ||
      item.lastName.trim().toLowerCase().includes(lowerCasedSearch)

    );
    setTotalItems(searchedValues.length);
    setItemOffset(FIRST_INDEX);
    setCurrentPage(FIRST_INDEX)

    setTimeout(() => {
      setLoading(false);
      const dataSlice = [...searchedValues].slice(FIRST_INDEX, FIRST_INDEX + ITEMS_PER_PAGE);
      setTableData(dataSlice);
    }, 500);
  }, [searchText, leadsData]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * ITEMS_PER_PAGE) % totalItems;
    const data = [...leadsData].slice(newOffset, newOffset + ITEMS_PER_PAGE);
    setTableData(data);
    setItemOffset(newOffset);
  };

  const fetchLeads = useCallback(async () => {
    try {
      const leads = await getAllLeads();
      setTotalItems(leads.length);
      dispatch(updateLeadsAdmin(leads));
    } catch (error) {
      console.error(error);
      dispatch(updateLeadsAdmin([]));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) router.replace(ROUTERS.home);
  }, [isAdmin]);

  useEffect(() => {
    isAdmin && fetchLeads();
  }, [profile]);

  useEffect(() => {
    const dataSlice = [...leadsData].slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
    const lowerCasedSearch = searchText.toLowerCase().trim();
    const filteredData = dataSlice.filter(item =>
      item.firstName.trim().toLowerCase().includes(lowerCasedSearch) ||
      item.lastName.trim().toLowerCase().includes(lowerCasedSearch)
    );
    setTableData(filteredData);
  }, [leadsData]);

  return {
    tableData,
    loading,
    pageCount,
    leadsData,
    currentPage,
    itemOffset,
    handlePageClick,
    handleSearchLeads,
    onChangeTextSearch,
  };
};

export default useAdminHook;
