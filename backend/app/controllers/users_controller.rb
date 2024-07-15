class UsersController < ApplicationController
    before_action :authorize_user, except: [:create]
    def create
        Rails.logger.debug "Request params: #{user_params}"
        @user = User.new(user_params)
        if @user.save
          render json: { message: 'Registration successful. Please log in.' }, status: :created
        else
          render json: { errors: @user.errors }, status: :unprocessable_entity
        end
      end
    
    def add_admin
      email = params[:email]
  
      if email.blank?
        render json: { errors: 'Email parameter is required' }, status: :unprocessable_entity
      else
      @user = User.find_by(email: email)
        if @user.nil?
          render json: { errors: 'No user with that Email found' }, status: :not_found
        else
          @user.update_column(:role, 1)
          render json: { message: 'User is now an admin' }, status: :ok
        end
      end
    end

    def me
      user = authorize_user
        render json: { user: user}, status: :ok
    end
    
    private
  
    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end    
end
