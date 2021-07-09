import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { NavLink as RouterLink } from 'react-router-dom';
import TableIcon from '../../common/TableIcon';
import ChairIcon from '../../common/ChairIcon';
import BedIcon from '../../common/BedIcon';
import StorageIcon from '../../common/StorageIcon';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import styles from './ProductNav.module.scss';

const ProductNav = ({ className, products, open }) => {
  const categories = [...new Set(products.map(p => p.category))];
  const [openCategory, setOpenCategory] = React.useState('');

  useEffect(() => {
    if (open) setOpenCategory(open);
  }, [open]);

  const handleClick = (category) => {
    setOpenCategory(category);
  };

  const CategoryIcon = ({category}) => {
    const iconMap = {
      chairs: ChairIcon,
      tables: TableIcon,
      storage: StorageIcon,
      beds: BedIcon,
    };

    if (iconMap[category]) {
      const Icon = iconMap[category];
      return <Icon />;
    } else return <FormatListBulletedIcon />;
  };

  return (
    <Paper component='aside' className={clsx(className, styles.root)}>
      <List component="nav">
        {categories.map((category, i) => (
          <li key={i}>
            <ListItem button className={styles.category} onClick={() => handleClick(category)}>
              <ListItemIcon>
                <CategoryIcon category={category}/>
              </ListItemIcon>
              <ListItemText primary={category} />
              {category === openCategory ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={category === openCategory} timeout="auto">
              <List disablePadding>
                { products.filter(p => p.category === category).map( ({id, name}) => (
                  <ListItem
                    key={id}
                    className={styles.item}
                    button
                    component={RouterLink}
                    activeClassName={styles.active}
                    to={`/products/${id}`}
                  >
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </li>
        ))}
      </List>
    </Paper>
  );

};

ProductNav.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.string,
};

export default ProductNav;
