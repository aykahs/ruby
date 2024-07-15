class ApplicationController < ActionController::API
    include TokenHelper
    def authorize_user
        token = request.headers['Authorization']&.split(' ')&.last
        payload = decode_token(token)
        if payload.nil?
            render json: { error: 'Unauthorized' }, status: :unauthorized
        else
            @current_user = User.find(payload['user_id'])
        end
    end

    def authorize_admin
        if !@current_user || !@current_user.admin?
            render json: { error: 'Unauthorized' }, status: :unauthorized
        end
    end
end
