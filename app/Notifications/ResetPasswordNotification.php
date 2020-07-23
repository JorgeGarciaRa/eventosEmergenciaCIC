<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
   
    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * Create a notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Solicitud de reestablecimiento de contraseña')
            ->greeting('Hola   ' .  $notifiable->nombre)
            ->line('Recibes este email porque se solicito un reestablecimiento de contraseña para tu cuenta .')
            ->action('Reestablecer Contraseña', url(config('app.url').route('password.reset', $this->token, false)))
            ->line('Si no realizastes esta petición,puedes ignorar este correo y nada habrá cambiado.')
            ->salutation('¡Saludos!');     
        }
}
