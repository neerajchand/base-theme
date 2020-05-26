/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateMeta } from 'Store/Meta';
import MenuOverlay from 'Component/MenuOverlay';
import { HistoryType } from 'Type/Common';
import { withRouter } from 'react-router';
import isMobile from 'Util/Mobile';

import './MenuPage.style';

export const mapDispatchToProps = middleware(
    dispatch => ({
        updateMeta: meta => dispatch(updateMeta(meta))
    }),
    'Route/MenuPage/Container/mapDispatchToProps'
);

export class MenuPageContainer extends ExtensiblePureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        history: HistoryType.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Menu') });
        this.redirectIfNotOnMobile();
    }

    redirectIfNotOnMobile() {
        const { history } = this.props;

        if (!isMobile.any()) {
            history.push('/');
        }
    }

    render() {
        return (
            <main block="MenuPage">
                <MenuOverlay />
            </main>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(
    middleware(MenuPageContainer, 'Route/MenuPage/Container')
));
