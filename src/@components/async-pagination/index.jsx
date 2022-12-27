import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { AsyncPaginate } from "react-select-async-paginate";
import { authHeaders } from "../../@utils/authentications";
import { apiHandler } from "../../@utils/urls/api-manager";
import classNames from "classnames";

const AsyncPagination = ({
  toSearch,
  url,
  reload,
  name,
  value,
  parentFunction,
  selector,
  placeholder,
  multi,
  closeMenu,
  error,
  isClearable,
}) => {
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const response = await fetch(
      `${apiHandler(url)}${
        toSearch ? toSearch : "name"
      }=${searchQuery}&page=${page}`,
      authHeaders
    );
    const responseJSON = await response.json();

    return {
      options: responseJSON.results,
      hasMore: responseJSON.next,
      additional: {
        page: page + 1,
      },
    };
  };
  return (
    <Fragment>
      <AsyncPaginate
        className={classNames({ "border-danger": error })}
        value={value}
        loadOptions={loadOptions}
        isMulti={multi}
        onChange={(e) => parentFunction(e, name)}
        // menuIsOpen={true}
        placeholder={placeholder}
        classNamePrefix="select"
        getOptionLabel={(options) => options[selector]}
        getOptionValue={(options) => options[selector]}
        cacheUniqs={[reload]}
        // getOptionLabel={(option) => <div className='d-flex align-items-center'><div className='mr-1' style={{width:10, height:10, background:option.color_code}}></div>{option.name}</div>}
        isSearchable={true}
        isClearable={!isClearable}
        closeMenuOnSelect={!closeMenu}
        //   placeholder="Select House"
        additional={{
          page: 1,
        }}
      />
    </Fragment>
  );
};

AsyncPagination.propTypes = {
  regionName: PropTypes.string.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default AsyncPagination;
