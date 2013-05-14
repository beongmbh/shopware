/**
 * Shopware 4.0
 * Copyright © 2012 shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 *
 * @category   Shopware
 * @package    Customer
 * @subpackage Detail
 * @copyright  Copyright (c) 2012, shopware AG (http://www.shopware.de)
 * @version    $Id$
 * @author shopware AG
 */

//{namespace name=backend/performance/main}

/**
 * Categories fieldSet
 */
//{block name="backend/performance/view/tabs/settings/fields/customers"}
Ext.define('Shopware.apps.Performance.view.tabs.settings.fields.Customers', {
    /**
     * Define that the base field set is an extension of the "Base" fieldSet
     * @string
     */
    extend:'Shopware.apps.Performance.view.tabs.settings.fields.Base',

    /**
     * List of short aliases for class names. Most useful for defining xtypes for widgets.
     * @string
     */
    alias:'widget.performance-tabs-settings-customers',

    /**
     * Description of the fieldSet
     */
    caption: '{s name=tabs/settings/categories/title}Categories{/s}',

    /**
     * Component event method which is fired when the component
     * is initials. The component is initials when the user
     * want to create a new customer or edit an existing customer
     * @return void
     */
    initComponent:function () {
        var me = this;

        me.items = me.getItems();
        me.callParent(arguments);

    },

    getItems: function() {
        var me = this;

        return [
            {
                xtype: 'fieldset',
                defaults: me.defaults,
                title: '{s name=fieldset/information}Information{/s}',
                items: [
                    me.createDecriptionContainer("Allgemeine Beschreibung für Crossselling<br>" +
                            "<br>" +
                            "<b>Wichtig: </b> Informationen"), ]
            },
            {
                xtype: 'fieldset',
                defaults: me.defaults,
                title: '{s name=fieldset/customers/fieldset/also_bought}Configuration \'Customers also bought\'{/s}',
                items: [
                    {
                        xtype: 'performance-multi-request-button',
                        event: 'alsoBought',
                        title: 'Index aufbauen'
                    },
                    {
                        fieldLabel: '{s name=fieldset/customers/show_also_bought}Show{/s}',
                        name: 'customer[alsoBoughtShow]',
                        xtype: 'checkbox',
                        uncheckedValue: false,
                        inputValue: true
                    }
                ]},
            {
                xtype: 'fieldset',
                defaults: me.defaults,
                title: '{s name=fieldset/customers/fieldset/also_seen}Configuration \'Customers also viewed\'{/s}',
                items: [
                    {
                        xtype: 'performance-multi-request-button',
                        event: 'similarShown',
                        title: '{s name=fieldset/buildIndex}Build Index{/s}'
                    },
                    {
                        fieldLabel: '{s name=fieldset/customers/fieldset/also_seen}Enable{/s}',
                        name: 'customer[similarActive]',
                        helpText: '{s name=fieldset/customers/fieldset/help/also_seen/enable}Do you want to collect this information?{/s}',
                        xtype: 'checkbox',
                        uncheckedValue: false,
                        inputValue: true
                    },                    {
                        fieldLabel: '{s name=fieldset/customers/fieldset/alsobought/text/show}Show{/s}',
                        helpText: '{s name=fieldset/customers/fieldset/alsobought/help/show}Showing this information might bypass the HTTP-Cache{/s}',
                        name: 'customer[similarViewedShow]',
                        xtype: 'checkbox',
                        uncheckedValue: false,
                        inputValue: true
                    },
                    {
                        fieldLabel: '{s name=fieldset/customers/fieldset/alsobought/text/valid}Valid for...{/s}',
                        supportText: '{s name=fieldset/customers/fieldset/alsobought/support/valid}(in days){/s}',
                        name: 'customer[similarValidationTime]',
                        xtype: 'numberfield',
                        minValue: 1,
                        maxValue: 365
                    },
                    {
                        fieldLabel: '{s name=fieldset/refreshStrategy}Refresh strategy{/s}',
                        helpText: '{s name=fieldset/refreshStrategy/help}How do you want to refresh this information?<br><br>' +
                                '<b>Manually</b>: Refresh by clicking the *build Index* button<br>' +
                                '<b>CronJob</b>: Refresh with a CronJob (recommended)<br>' +
                                '<b>Live</b>: Refresh in live operation (not recommended for large shops){/s}',
                        name: 'customer[similarRefreshStrategy]',
                        xtype: 'combo',
                        valueField: 'id',
                        editable: false,
                        displayField: 'name',
                        store: Ext.create('Ext.data.Store', {
                            fields: [
                                { name: 'id', type: 'int' },
                                { name: 'name', type: 'string' }
                            ],
                            data: [
                                { id: 1, name: '{s name=fieldset/refreshStrategy/manual}Manually{/s}' },
                                { id: 2, name: '{s name=fieldset/refreshStrategy/cronJob}CronJob{/s}' },
                                { id: 3, name: '{s name=fieldset/refreshStrategy/live}Live{/s}' }
                            ]
                        })
                    }
                ]
            }
        ];
    }


});
//{/block}
