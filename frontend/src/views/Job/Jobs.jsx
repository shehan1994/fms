import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import TButton from "../../components/core/TButton";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

import "./styles.css"; // Import your styles

export default function Jobs() {
  const { showToast } = useStateContext();
  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axiosClient.delete(`/customer/${id}`).then(() => {
        getCustomers();
        showToast('The customer was deleted');
      });
    }
  };

  const onPageClick = (link) => {
    getCustomers(link.url);
  };

  const getCustomers = (url) => {
    url = url || "/customer";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setCustomers(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = customers.filter((item) =>
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PageComponent
      title="Jobs"
      buttons={
        <TButton color="green" to="/customers/create">
          <PlusCircleIcon className="h-6 w-6 mr-2"/>
          Create new
        </TButton>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="my-2 flex sm:flex-row flex-col justify-between">
            <div></div> {/* Empty div to push the search input to the right */}
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <input
                  type="text"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    NIC
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Passport
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    DOB
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody>
                {currentRows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{row.first_name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{row.last_name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{row.nic}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{row.passport_no}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{row.email}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{row.dob}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link
                        to={`/customers/${row.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {indexOfFirstRow + 1} to {indexOfLastRow < filteredData.length ? indexOfLastRow : filteredData.length} of {filteredData.length} Entries
              </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  {[...Array(Math.ceil(filteredData.length / rowsPerPage)).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`text-sm px-4 py-2 leading-none border rounded ${
                        currentPage === number + 1 ? 'text-white bg-blue-500' : 'text-gray-600 bg-white'
                      } hover:bg-gray-200`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageComponent>
  );
}
