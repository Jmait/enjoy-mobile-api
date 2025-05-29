import { Controller, Post, Body, Get, Query, UseGuards, Request, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PaginationQueryDto } from './dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check-email')
  @ApiOperation({ summary: 'Check if email exists' })
  @ApiResponse({ status: 200, description: 'Email check result' })
  async checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.authService.checkEmail(checkEmailDto.email);
  }
  @Post('signup')
  @ApiOperation({ summary: 'Create new user account' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully created',
    schema: {
      example: {
        user: {
          firstName: "Jean",
          lastName: "Dupont",
          email: "jean.dupont@gmail.com",
          phone: "0612345678",
          birthYear: 1990
        }
      }
    }
  
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  @ApiResponse({ status: 404, description: 'Email not found' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token and code' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid token or code' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return {
      user: req.user,
    };
  }
@Put(':userId/me')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
async updateMe(
  @Param('userId') userId:string,
  @Body() updateUserDto: UpdateUserDto
) {
  return this.authService.updateUser(userId, updateUserDto);
}
  @Patch('change-password/:userId')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
async changePassword(
   @Param('userId')userId:string,
  @Body() changePasswordDto: ChangePasswordDto,
) {
  return this.authService.changePassword(
    userId,
    changePasswordDto.currentPassword,
    changePasswordDto.newPassword,
  );
}
@Get('admin/users/all')
async getAllUsers(@Query() query: PaginationQueryDto) {
  return this.authService.findAllUsers(query.page, query.limit);
}

@Patch('admin/:id/suspend')
  async suspendUser(@Param('id') id: string) {
    return this.authService.suspendUser(id);
  }

  @Delete('admin/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}