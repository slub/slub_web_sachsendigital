
CREATE TABLE tt_content (
    tx_slubwebsachsendigital_slider varchar(255) DEFAULT '' NOT NULL,
);

CREATE TABLE tx_slubwebsachsendigital_slider (
    tt_content int(11) unsigned DEFAULT '0',
    title varchar(255) DEFAULT '' NOT NULL,
    subtitle varchar(255) DEFAULT '' NOT NULL,
    url varchar(255) DEFAULT '' NOT NULL,
    image int(11) unsigned DEFAULT '0'
);
