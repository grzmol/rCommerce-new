import React, {useEffect, useState} from 'react';
import axios from "axios";

import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";

import "./productList.css";
import {Container, FormControl, InputLabel, Select} from "@material-ui/core";
import ProductGridItem from "../ProductGridItem/productGridItem";
import AuthService from "../../services/authService";
import _ from "lodash";

const auth = new AuthService();
const currentUser = auth.getProfile();

const ProductListComponent = ({history, ...props}) => {
    const {t} = props;
    const [products, setProducts] = useState([]);
    const [sortingOption, setSortingOption] = useState();
    const query = new URLSearchParams(props.location.search);
    const category = query.get('category');
    const searchQuery = query.get('search');


    useEffect(() => {
        fetchProducts();
    }, [searchQuery]);

    const fetchProducts = () => {
        let endpoint = '/api/product';
        if(category){
            endpoint = '/api/product/getByCategory/' + category;
        }else if(searchQuery){
            endpoint = '/api/product/search?query=' + searchQuery;
        }

        axios.get(endpoint).then(resp => {
            if (resp.status === 200) {
                setProducts(resp.data);
            }
        });
    }

    const sortBy = (event) => {
        let val = event.target.value;
        setSortingOption(val);

        switch (val) {
            case 'name-asc':
                setProducts(_.sortBy(products, 'name'))
                break;
            case 'name-desc':
                setProducts(_.sortBy(products, 'name').reverse())
                break;
            case 'price-asc':
                setProducts(_.sortBy(products, 'price'))
                break;
            case 'price-desc':
                setProducts(_.sortBy(products, 'price').reverse())
                break;
            default:
                break;
        }
    }

    const getPageTitle = () => {
        if(category){
            return category.charAt(0).toUpperCase() + category.slice(1);;
        }else if(searchQuery){
            return t('ProductSearch_ResultTitle') + ` "${searchQuery}" `;
        }

        return t('ProductList_Title')

    }

    return (
        <div className="product-list-container">
            <Container>
                <h1>{getPageTitle()}</h1>
                <div className="product-list-filter-section">
                    <FormControl style={{float: 'right'}}>
                        <InputLabel htmlFor="sort-option-input">{t('Sort_Action')}</InputLabel>
                        <Select
                            native
                            value={sortingOption}
                            onChange={sortBy}
                            inputProps={{
                                name: 'sort',
                                id: 'sort-option-input',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value="name-asc">{t('Sort_NameAsc')}</option>
                            <option value="name-desc">{t('Sort_NameDesc')}</option>
                            <option value="price-asc">{t('Sort_PriceAsc')}</option>
                            <option value="price-desc">{t('Sort_PriceDesc')}</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="product-list-content">
                    {products.map(item => <ProductGridItem key={item.productCode} currentUser={currentUser}
                                                           product={item}/>)}
                </div>

            </Container>

        </div>
    )
};
export default withTranslation()(withRouter(ProductListComponent));