# coding: utf-8
class PagesController < ApplicationController
  def community
    @title = "コミュニティ"
  end

  def map
    @title = "盛上がりマップ 20時x20代"
  end

  def feed
    @title = "フィード"
  end

  def settings
    @title = "設定"
  end

  def event
    @title = "イベント詳細"
    
    events = [{ :name => "ポプテピピックオフ@たんや",
                :space => "たんや",
                :when => "5/27 19:30",
                :contents => "ポプテピピック好きで集まります。当日はみなさんとたくさん話したいです！"
              }, {

              }, {

              }]
    @event = events[params[:id].to_i-1]
  end
end
