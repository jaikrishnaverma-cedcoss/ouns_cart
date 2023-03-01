import {
  AutoComplete,
  Card,
  Filter,
  FlexChild,
  FlexLayout,
} from "@cedcommerce/ounce-ui";
import React, { useRef } from "react";
import { useState } from "react";
import { filteredData } from "./database";

const Body = ({cart,cartHandler}) => {
  const data = filteredData();
  const [state, setState] = useState({ searchInput: "", products: data ,cart:[]});
  let [filter, setFilter] = useState({});
  let selectSort = useRef(null);
  let formref=useRef(null)
  // store filter key objects values in filter state
  const filterHandler = (key, val) => {
    let currentFilter = filter;
    if (currentFilter[key]) {
      let index = currentFilter[key].indexOf(val);
      if (index !== -1) currentFilter[key].splice(index, 1);
      else currentFilter[key] = [...currentFilter[key], val];
    } else currentFilter[key] = [val];
    setFilter({ ...currentFilter });
  };
  // making the list of for select filters
  const selectionList = (key) => {
    let arr = [];
    data.map((x) => {
      if (!arr.includes(x[key])) arr.push(x[key]);
    });
    return arr;
  };
  const searchHandler = (str = state.searchInput) => {
    var result = data.filter((item) => {
      let found = false;
      Object.values(item).forEach((x) => {
        if (x.toString().toLocaleLowerCase().includes(str.toLocaleLowerCase()))
          found = true;
      });
      return found;
    });
    if (str) setState({ ...state, searchInput: str, products: [...result] });
    else setState({ ...state, searchInput: str, products: data });
  };
  // set filter keys and value
  const filterer = (filterKeys, index = 0, filteredArr = data) => {
    if (index == filterKeys.length) return filteredArr;
    let filters = filter;
    let tempArr = [];
    let currentKey = filterKeys[index];
    if (filters[currentKey].length == 0)
      return filterer(filterKeys, index + 1, filteredArr);

    filters[currentKey].forEach((val) => {
      filteredArr.forEach((obj) => {
        if (currentKey === "price") {
          let minMax = val.split("-");
          console.log("minMax", minMax);
          if (
            obj[currentKey] >= parseInt(minMax[0]) &&
            obj[currentKey] <= parseInt(minMax[1])
          )
            tempArr.push(obj);
        } else if (obj[currentKey] == val) tempArr.push(obj);
      });
    });
    return filterer(filterKeys, index + 1, tempArr);
  };
  //sort according selection
  const sorter = (key, asc = true) => {
    let sortedArr = state.products;
    const sortLogic = (a, b) => {
      if (isFinite(sortedArr[0][key]))
        return asc ? a[key] - b[key] : b[key] - a[key];
      else {
        if (asc) {
          if (a[key] < b[key]) {
            return -1;
          }
          if (a[key] > [key]) {
            return 1;
          }
        } else {
          if (a[key] < b[key]) {
            return 1;
          }
          if (a[key] > b[key]) {
            return -1;
          }
        }
        return 0;
      }
    };
    state.products.sort(sortLogic);
    setState({ ...state, products: [...state.products] });
  };
//  when use want to apply filter after give all selections
  const filterhit=()=>{
    let flg = false;
    Object.keys(filter).forEach((check) => {
      if (filter[check].length > 0) flg = true;
    });
    if (flg)
      setState({ ...state, products: [...filterer(Object.keys(filter))] });
    else {
      setState({ ...state, products: [...data] });
    }
  }
  return (
    <div>
      <Card title="">
        <FlexLayout halign="center" spacing="tight">
          <FlexChild desktopWidth="80" mobileWidth="80" tabWidth="80">
            <AutoComplete
              clearButton
              clearFunction={function noRefCheck() {
                setState({ ...state, searchInput: "", products: data });
              }}
              extraClass=""
              name=""
              onChange={function noRefCheck(e) {
                setState({ ...state, searchInput: e.toString() });
              }}
              onClick={function noRefCheck(e) {
                searchHandler(e);
              }}
              onEnter={searchHandler}
              options={[
                ...data.map((x) => {
                  if (x.title) return { label: x.title, value: x.title };
                }),
              ]}
              placeHolder="Search Your Items"
              popoverContainer="body"
              popoverPosition="right"
              setHiglighted
              showHelp="Kindly Search your required Item"
              thickness="thick"
              value={state.searchInput}
            />
          </FlexChild>
          <FlexChild>
            <>
            <form ref={formref} onSubmit={(e)=>e.preventDefault()}>
              <Filter
                button={<i className="bi bi-funnel-fill"></i>}  
                filters={[
                  {
                    children: (
                      <select
                        ref={selectSort}
                        className="form-select col-4"
                        id="sorter"
                        onChange={(e) => sorter(e.target.value)}
                        aria-label="Default select example"
                      >
                        {state.products.length > 0 &&
                          Object.keys(data[0]).map(
                            (x) =>
                              x !== "id" &&
                              x !== "tags" && (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              )
                          )}
                      </select>
                    ),
                    name: "Sort By",
                  },
                  {
                    children: (
                      <>
                        {[
                          "0-500",
                          "500-1000",
                          "1000-2000",
                          "2000-5000",
                          "5000-100000",
                        ].map((x, i) => (
                          <li
                            key={x.toString() + i + "_1"}
                            className="list-group-item"
                          >
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              value=""
                              onChange={() => filterHandler("price", x)}
                              aria-label="..."
                            />
                            {x} <i className="bi bi-currency-rupee"></i>
                          </li>
                        ))}
                      </>
                    ),
                    name: "Select and Text Field Filter",
                  },
                  ...[
                    {
                      title: "By Categories",
                      key: "category",
                      icon: "bi-check-all",
                    },
                    { title: "By Brands", key: "brand", icon: "bi-postage" },
                    {
                      title: "By Discount",
                      key: "discountPercentage",
                      icon: "bi-postage",
                    },
                  ].map((base, i) => {
                    return {
                      name: base.title,
                      children: (
                        <>
                          {selectionList(base.key).map((x, index) => (
                            <li
                              className="list-group-item"
                              key={x.toString() + index + "_li_1"}
                            >
                              <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value=""
                                onChange={() => {
                                  filterHandler(base.key, x);
                                }}
                                aria-label="..."
                              />
                              {x}
                              {base.key == "discountPercentage" ? " %" : ""}
                            </li>
                          ))}
                        </>
                      ),
                    };
                  }),
                ]}
                heading="Filter"
                disableReset={false}
                disableApply={false}
                onApply={filterhit}
                resetFilter={()=>{setFilter({});setState({...state,products:data});formref.current.reset()}}
              />
              </form>
            </>
          </FlexChild>
        </FlexLayout>
      </Card>
      <Card>
        <Card title="">
          <Card title="Products:" extraClass="wrapper_card">
            <div className="flexcontainer">
              <FlexLayout
                childWidth="fullWidth"
                spacing="extraLoose"
                wrap="wrap"
                wrapMob="wrap"
              >
                {state.products.length > 0 ? (
                  state.products.map((x) => (
                    <div className="wrapper">
                      <Card
                        alt={x.title}
                        extraClass="mycard"
                        cardType="Shadowed"
                        media={Array.isArray(x.images) ? x.images[0] : x.images}
                        title="Card With Media"
                      >
                        <div style={{ minHeight: "162px" }}>
                          <h4>{x.title}</h4>
                          <p>{x.brand + " / " + x.category}</p>
                          <p>
                            Rating:{" " + x.rating + " "}
                            <i
                              className="bi bi-star-fill"
                              style={{ color: "orange" }}
                            ></i>
                          </p>
                          <p style={{ marginBottom: "20px" }}>
                            Stocks:{" " + x.stock}
                          </p>
                          <h3>
                            <i className="bi bi-currency-rupee"></i>
                            {" " + x.price}
                          </h3>
                        </div>
                        <button className="addtocart" onClick={()=>{cartHandler(x)}}>ADD TO CART</button>
                      </Card>
                    </div>
                  ))
                ) : (
                  // in case no products available for filter
                  <Card
  alt="Natutre"
  cardType=""
  media="no-products-removebg-preview.png"
  title=""
/>
                )}
              </FlexLayout>
            </div>
          </Card>
        </Card>
      </Card>
    </div>
  );
};

export default Body;
