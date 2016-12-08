import arrayMin from 'd2-utilizr/lib/arrayMin';

export var StatusBar;

StatusBar = function(refs) {
    var dimensionConfig = refs.dimensionConfig;

    var aggregated_values = dimensionConfig.dataType['aggregated_values'],
        individual_cases = dimensionConfig.dataType['individual_cases'];

    Ext.define('Ext.ux.toolbar.StatusBar', {
        extend: 'Ext.toolbar.Toolbar',
        alias: 'widget.statusbar',
        queryCmps: [],
        showHideQueryCmps: function(fnName) {
            this.queryCmps.forEach(function(cmp) {
                cmp[fnName]();
            });
        },
        setStatus: function(layout, response) {
            this.pager = response.metaData.pager;

            this.reset(layout.dataType);

            if (layout.dataType === aggregated_values) {
                this.statusCmp.setText(response.rows.length + ' values');
                return;
            }

            if (layout.dataType === individual_cases) {
                var maxVal = this.pager.page * this.pager.pageSize,
                    from = maxVal - this.pager.pageSize + 1,
                    to = arrayMin([maxVal, this.pager.total]);

                this.pageCmp.setValue(this.pager.page);
                this.pageCmp.setMaxValue(this.pager.pageCount);
                this.totalPageCmp.setText(' of ' + this.pager.pageCount);
                this.statusCmp.setText(from + '-' + to + ' of ' + this.pager.total + ' cases');
                return;
            }
        },
        reset: function(dataType) {
            if (!dataType || dataType === aggregated_values) {
                this.showHideQueryCmps('hide');
                this.pageCmp.setValue(1);
                this.totalPageCmp.setText('');
                this.statusCmp.setText('');
                return;
            }

            if (dataType === individual_cases) {
                this.showHideQueryCmps('show');
                this.pageCmp.setValue(1);
                this.totalPageCmp.setText(' of 1');
                this.statusCmp.setText('');
            }
        },
        getCurrentPage: function() {
            return this.pageCmp.getValue();
        },
        getPageCount: function() {
            return this.pageCount;
        },
        onPageChange: function(page, currentPage) {
            currentPage = currentPage || this.getCurrentPage();

            if (page && page >= 1 && page <= this.pager.pageCount && page != currentPage) {
                var layout = instanceManager.getStateCurrent();

                layout.paging.page = page;
                this.pageCmp.setValue(page);
                instanceManager.getReport(layout);
            }
        },
        initComponent: function() {
            var container = this,
                size = this.pageSize;

            this.firstCmp = Ext.create('Ext.button.Button', {
                text: '<<',
                handler: function() {
                    container.onPageChange(1);
                }
            });
            this.queryCmps.push(this.firstCmp);

            this.prevCmp = Ext.create('Ext.button.Button', {
                text: '<',
                handler: function() {
                    container.onPageChange(container.getCurrentPage() - 1);
                }
            });
            this.queryCmps.push(this.prevCmp);

            this.pageTextCmp = Ext.create('Ext.toolbar.TextItem', {
                text: 'Page ',
                style: 'line-height:21px',
            });
            this.queryCmps.push(this.pageTextCmp);

            this.pageCmp = Ext.create('Ext.form.field.Number', {
                width: 34,
                height: 21,
                minValue: 1,
                value: 1,
                hideTrigger: true,
                enableKeyEvents: true,
                currentPage: 1,
                listeners: {
                    render: function() {
                        Ext.get(this.getInputId()).setStyle('padding-top', '2px');
                    },
                    keyup: {
                        fn: function(cmp) {
                            var currentPage = cmp.currentPage;

                            cmp.currentPage = cmp.getValue();

                            container.onPageChange(cmp.getValue(), currentPage);
                        },
                        buffer: 200
                    }
                }
            });
            this.queryCmps.push(this.pageCmp);

            this.totalPageCmp = Ext.create('Ext.toolbar.TextItem', {
                text: '',
                style: 'line-height:21px'
            });
            this.queryCmps.push(this.totalPageCmp);

            this.nextCmp = Ext.create('Ext.button.Button', {
                text: '>',
                handler: function() {
                    container.onPageChange(container.getCurrentPage() + 1);
                }
            });
            this.queryCmps.push(this.nextCmp);

            this.lastCmp = Ext.create('Ext.button.Button', {
                text: '>>',
                handler: function() {
                    container.onPageChange(container.pager.pageCount);
                }
            });
            this.queryCmps.push(this.lastCmp);

            this.statusCmp = Ext.create('Ext.toolbar.TextItem', {
                text: '',
                style: 'line-height:21px',
            });

            this.items = [
                this.statusCmp,
                this.firstCmp,
                this.prevCmp,
                this.pageTextCmp,
                this.pageCmp,
                this.totalPageCmp,
                this.nextCmp,
                this.lastCmp,
                '->',
                this.statusCmp
            ];

            this.callParent();
        }
    });
};
