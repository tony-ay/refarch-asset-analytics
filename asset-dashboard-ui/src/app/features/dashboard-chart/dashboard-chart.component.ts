import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../assets/asset';
import { AssetsService } from '../../features/assets.service';
import Chart from 'chart.js';


@Component({
  selector: 'dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit {
    
    @Input()
    selectedAsset: Asset;
    
    @Input()
    dataSource: Asset[];

    historyMap : Map<any, any>;

          // initialize map of form <pump id, list of different timestamp objects>
    initHistoryMap(assets) {

      var historyMap = new Map();

      for (var i = 0; i < assets.length && assets[i]; i++) {
          if (historyMap.get(assets[i].id) == null) { // ID does not yet exist, add first asset to list
            var startList = []
            startList.push(assets[i]);
            historyMap.set(assets[i].id, startList);
          }
          else { // ID exists, add asset to current list
            var currentList = historyMap.get(assets[i].id);
            currentList.push(assets[i]);
            historyMap.set(assets[i].id, currentList);
          }
      }

      return historyMap;
    }

    // chart summary will be triggered here 
    filterData(selectedAssetAnalysis) {
        console.log("selected id: "+selectedAssetAnalysis.id);
        var minDate = new Date((<HTMLInputElement>document.getElementById('min')).value).getTime();
        var maxDate = new Date((<HTMLInputElement>document.getElementById('max')).value).getTime();
        // NaN check
        if (isNaN(minDate)) {minDate = 0;}
        if (isNaN(maxDate)) {maxDate = 9999999999999}
        //console.log("date format: "+document.getElementById('min').value)
        console.log("min date: "+minDate);
        console.log("max date: "+maxDate);
        var pumpHistory = this.historyMap.get(selectedAssetAnalysis.id); 

        // init data
        var dataset = [];
        var label = [];

        var selector = (<HTMLSelectElement>document.getElementById('attrSelector'));
        var attributeSelect = selector.options[selector.selectedIndex].value;

        console.log(attributeSelect);

        for (var i = 0; i < pumpHistory.length; i++) {
          var pumpTimeStamp = new Date(pumpHistory[i].timestamp).getTime();
          // filter values
          if (pumpTimeStamp >= minDate && pumpTimeStamp <= maxDate) {
            // plot here
            // add desired attribute
            if (attributeSelect === 'temperature') {dataset.push(pumpHistory[i].temperature);}
            else if (attributeSelect === 'pressure') {dataset.push(pumpHistory[i].pressure);}
            else if (attributeSelect === 'flow') {dataset.push(pumpHistory[i].flowRate);}
            else if (attributeSelect === 'current') {dataset.push(pumpHistory[i].current);}
            else if (attributeSelect === 'rotation') {dataset.push(pumpHistory[i].rotation);}
            label.push(pumpHistory[i].timestamp);

          }
        }
        if (label.length < 1) {
            //console.log("no data points");
            (<HTMLInputElement>document.getElementById('errorMessage')).value = "No data points in specified range!";
        }
        // add unit of measurement
        if (attributeSelect === 'temperature') {attributeSelect += ' (°F)';}
        else if (attributeSelect === 'pressure') {attributeSelect += ' (Pa)';;}
        else if (attributeSelect === 'flow') {attributeSelect += ' (m3/s)';}
        else if (attributeSelect === 'current') {attributeSelect += ' (A)';}
        else if (attributeSelect === 'rotation') {attributeSelect += ' (rad/s)';}
        var data: any = {};
        data.labels = label;
        data.datasets = [];
        data.datasets.push(
              { 
                data: dataset,
                label: attributeSelect,
                borderColor: "#c45850",
                fill: false
              });
        this.buildChart(data);
      }

      buildChart(data){
          console.log("build chart");
          new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: data,
            options: {
              title: {
                display: true,
                text: 'Pump attributes over specified date range'
              }
            }
          });
      }

      ngOnInit() {
        //console.log(this.dataSource);
        this.historyMap = this.initHistoryMap(this.dataSource);
        var data: any = {};
        data.labels = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
        data.datasets = [];
        data.datasets.push( 
              {
                data: [6,3,2,2,7,26,82,172,312,433],
                label: "FillerData",
                borderColor: "#c45850",
                fill: false
              });
        this.buildChart(data);
      }

}