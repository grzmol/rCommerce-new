import React from 'react';
import LazyHero from 'react-lazy-hero';
import "./heroImage.css";
import axios from "axios";
import _ from 'lodash';

export default class HeroImageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            promoImages: []
        }
    }

    componentDidMount() {

        axios.get('/api/image?type=promo').then(resp => {
            if (resp.status === 200 && resp.data) {
                this.setState({promoImages: resp.data});
            }
            this.setState({dataReady: true});

        }).catch(err => {
            console.error(err)
        });

    }

    render() {
        let promoImg = _.isArray(this.state.promoImages) && this.state.promoImages.length > 0 ? this.state.promoImages[0] : {};
        return (
            <LazyHero imageSrc={promoImg.imgBase64} opacity={0.4} minHeight="82vh" isFixed={true}
                      className='lazy-hero-container'>
                <h1>{promoImg.desc}</h1>
            </LazyHero>
        )
    }
}