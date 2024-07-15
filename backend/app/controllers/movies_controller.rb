class MoviesController < ApplicationController
  before_action :authorize_user, except: [:index,:show]
  before_action :authorize_admin, except: [:index,:show]

  # GET /movies
  def index
    @movies = Movie.includes(:created_by).all

    render json: @movies.as_json(include: { created_by: { only: :name } })
  end

  # GET /movies/1
  def show
    @movie = Movie.find(params[:id])
    render json: @movie
  end

  # POST /movies
  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      render json: @movie, status: :created, location: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /movies/1
  def update
    @movie = Movie.find(params[:id])
    if @movie.update(movie_params)
      render json: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movies/1
  def destroy
    @movie = Movie.find(params[:id])
    @movie.destroy!
  end

  private

    def movie_params
      params.require(:movie).permit(:name, :description, :rate).tap do |whitelisted|
        whitelisted[:created_by_id] = authorize_user.id if authorize_user
      end
    end
end
