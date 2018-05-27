require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get community" do
    get pages_community_url
    assert_response :success
  end

end
